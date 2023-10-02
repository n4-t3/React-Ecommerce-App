// import { Request, Response, NextFunction } from "express";

// export const isAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//     const token = req.headers.authorization;
//     if (token) {
//         jwt.verify(token, 'your-secret-key', (err, decoded) => {
//             if (err) {
//               return res.status(401).json({ message: 'Unauthorized' });
//             }

//             req.userId = decoded.userId; // Set the user ID in the request
//             next();
//           });

//       }
//       return res.status(401).json({ message: 'Unauthorized' });
// };
