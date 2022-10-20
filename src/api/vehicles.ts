import ApiService from "@davinci/ApiService"
import { Vehicle } from "@wowtypes/db/vehicles"

const VehicleService = new ApiService<Vehicle>(["vehicles"], "vehicles/")

export default VehicleService
