import { getConnection, getRepository } from "typeorm";
import VaccinationCenter from "../entities/vaccinationCenter";


async function getVaccinationCenters(): Promise<VaccinationCenter[]> {
    return getRepository(VaccinationCenter).createQueryBuilder('vaccinationcenter')
    .orderBy('vaccinationcenter.vaccinationcenterId','ASC').getMany();
}

export default { getVaccinationCenters };