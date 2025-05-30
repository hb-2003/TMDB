import { getAlternativeTitlesService } from "../../services";

export interface AlternativeTitle {
  iso_3166_1: string;
  title: string;
  type?: string;
}

export interface GetAlternativeTitlesResponse {
  id: number;
  titles: AlternativeTitle[];
}


export const getAlternativeTitles = async (
  _: any,
  { id }: { id: number }
): Promise<GetAlternativeTitlesResponse> => {
 try {
   return await getAlternativeTitlesService(id);
 }  catch (error) { 
    throw error;
  }
}