import axios from "axios";
import { API_ROOT } from "~/utils/constants";

export const fetchBoardDetailsAPI = async (boardId) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
    // note: axios se tra ket qua ve qua property cua no la data  
    return request.data
}

