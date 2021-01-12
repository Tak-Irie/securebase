import type { NextApiRequest, NextApiResponse } from 'next';
import auth0 from './utils/auth0';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    console.log(
      'beforeeeeeeeeeeeeeeeeeeeeeereeqqqqqqqqqqqqqqqqqqqqqqqqqq',
      req,
    );

    await auth0.handleCallback(req, res, { redirectTo: '/' });
    console.log(
      'afterrrrrrrrrrrrrrrrrrrrrrrreeqqqqqqqqqqqqqqqqqqqqqqqqqq',
      req,
    );
    console.log('ressssssssssssssssssssssssssssssssssssssssssssssssssss', res);
  } catch (error) {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(error.status || 400).end(error.message);
  }
};
