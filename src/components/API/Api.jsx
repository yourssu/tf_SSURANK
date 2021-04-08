import axios from "axios";

export const getMajorList = async () => {
    const response = await axios.get("https://test.ground.yourssu.com/timetable/v1/ssurank/professor/department/list");
    setMajorData(response.data);
};
