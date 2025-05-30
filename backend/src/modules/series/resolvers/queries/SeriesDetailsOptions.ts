import { SeriesDetailsOptions as options } from '../../../../utils/types';
import { SeriesDetailsOptionsService } from '../../services';


export const SeriesDetailsOptions = async (
  _: unknown,
  { id }: { id: number }
): Promise<options> => {
  try {
    return await SeriesDetailsOptionsService(id);
  } catch (error) {
    throw error;
  }
}
