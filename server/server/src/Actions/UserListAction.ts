import {getConnection} from "typeorm";
import {Users} from "../entity/Users";

export function UsersListAction(req: Request, res: Response) {
    return getConnection().getRepository(Users).find();
}