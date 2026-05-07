import SortOrder from "../enums/SortOrderEnum";
import { SortBy, Standard } from "../enums/StudentEnums";

export interface CreateStudentDTO {
    name: string;
    roll_no: number;
    standard: Standard;
    date_of_birth: string;
}

export interface UpdateStudentDTO {
    name?: string;
    roll_no?: number;
    standard?: Standard;
    date_of_birth?: string;
}

export interface StudentParamsDTO {
    id: number;
}

export interface StudentQueryDTO {
    page?: number;
    limit?: number;
    sortBy?: SortBy;
    order?: SortOrder;
    name?: string;
}
