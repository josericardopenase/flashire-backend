import ApiService from "@davinci/ApiService"
import { Office } from "@wowtypes/db/offices"

const OfficeService = new ApiService<Office>(["offices"], "offices/")

export default OfficeService
