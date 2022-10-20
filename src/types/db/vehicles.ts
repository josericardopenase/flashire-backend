export interface Vehicle {
	id: number
	thumbnail: string
	brand: string
	model: string
	description: string
	plate_number: string
	bastidor_number: string
	state: string
	purchase_date: Date
	fuel_type: string
	itv_date: Date
	consumption_per_litter: string
	ficha_tecnica: string
	permiso_circulacion: string
	seguro: string
	licenses: number
	teacher: number | null
}

/**
 *     thumbnail = models.ImageField()

    brand = models.CharField(max_length=400, blank=True, null=True)
    model = models.CharField(max_length=400, blank=True, null=True)

    description = models.TextField(blank=True, null=True)

    plate_number = models.CharField(max_length=200, unique=True)
    bastidor_number = models.CharField(
        max_length=500, unique=True, null=True, blank=True
    )

    state = models.CharField(
        choices=VEHICLE_TYPE_CHOICES, max_length=200, default="USING"
    )

    purchase_date = models.DateField(blank=True, null=True)
    fuel_type = models.CharField(choices=VEHICLE_TYPE_CHOICES, max_length=300)
    itv_date = models.DateField(blank=True, null=True)
    consumption_per_litter = models.FloatField(blank=True, null=True)

    ficha_tecnica = models.FileField(upload_to="pdf", null=True, blank=True)
    permiso_circulacion = models.FileField(upload_to="pdf", null=True, blank=True)
    seguro = models.FileField(upload_to="pdf", null=True, blank=True)

    licences = models.OneToOneField(
        "licences.License", on_delete=models.SET_NULL, null=True, blank=True
    )

 */
