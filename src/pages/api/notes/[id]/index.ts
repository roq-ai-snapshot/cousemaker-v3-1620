import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { notesValidationSchema } from 'validationSchema/notes';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.notes
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getNotesById();
    case 'PUT':
      return updateNotesById();
    case 'DELETE':
      return deleteNotesById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getNotesById() {
    const data = await prisma.notes.findFirst(convertQueryToPrismaUtil(req.query, 'notes'));
    return res.status(200).json(data);
  }

  async function updateNotesById() {
    await notesValidationSchema.validate(req.body);
    const data = await prisma.notes.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteNotesById() {
    const data = await prisma.notes.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
