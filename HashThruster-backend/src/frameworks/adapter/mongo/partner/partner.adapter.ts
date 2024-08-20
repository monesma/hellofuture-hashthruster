import { PartnerQuery } from '../../../../domain/types/partner-types';

export function adapterMongoDataPartner(
  mongoPartnerResponse: any,
): PartnerQuery {
  return {
    _id: mongoPartnerResponse._id.toString(),
    name: mongoPartnerResponse.name,
    first_name: mongoPartnerResponse.first_name,
    last_name: mongoPartnerResponse.last_name,
    creation_date: mongoPartnerResponse.creation_date,
    public_key: mongoPartnerResponse.public_key,
    private_key: mongoPartnerResponse.private_key,
    email: mongoPartnerResponse.email,
    password: mongoPartnerResponse.password,
    phone: mongoPartnerResponse.phone,
    status: mongoPartnerResponse.status,
  };
}
