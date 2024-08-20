import dotenv from 'dotenv';
dotenv.config();
import { Response, NextFunction } from 'express';
import { AuthPKI } from '../../../domain/dto/admin/admin-dto';
// Fonction pour récupérer un nouveau refresh token
const recupRefresh = async (infos: AuthPKI) => {
  const datas = {
    refreshToken: infos.refreshToken,
    public_key: infos.public_key,
  };
  try {
    const response = await fetch(`${process.env.URL_BASE}/api/v1/auth/refreshAccessAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    });
    if (!response.ok) {
      throw new Error('Réponse non valide');
    }
    return await response.json();
  } catch (err) {
    throw new Error('Erreur lors de la récupération du refresh token');
  }
};

// Fonction pour récupérer un nouveau access token
const getAccess = async (infos: AuthPKI) => {
  const datas = {
    public_key: infos.public_key,
    _id: infos.id,
    email: infos.email,
    role: infos.role
  };
  try {
    const response = await fetch(`${process.env.URL_BASE}/api/v1/auth/getAccessAdmin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datas),
    });
    if (!response.ok) {
      throw new Error('Réponse non valide');
    }
    return await response.json();
  } catch (err) {
    throw new Error('Erreur lors de la récupération de l\'access token');
  }
};

// Middleware d'authentification
const authRefreshToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.body.refreshToken !== null) {
      const response = await recupRefresh(req.body);
      if (response.status === 200) {
        req.refreshToken = response.content.refreshToken;
        req.accessToken = response.content.accessToken;
        return next();
      } else if (response.status === 401) {
        const rep = await getAccess(req.body);
        if (rep.status === 200) {
          req.refreshToken = rep.content.refreshToken;
          req.accessToken = rep.content.accessToken;
          return next();
        } else {
          return res.status(401).json({ status: 401, msg: 'Unauthorized' });
        }
      }
    } else {
      const response = await getAccess(req.body);
      if (response.status === 200) {
        req.refreshToken = response.content.refreshToken;
        req.accessToken = response.content.accessToken;
        return next();
      } else {
        return res.status(401).json({ status: 401, msg: 'Unauthorized' });
      }
    }
  } catch (err) {
    return res.status(401).json({ status: 401, msg: 'Unauthorized' });
  }
};

export default authRefreshToken;
