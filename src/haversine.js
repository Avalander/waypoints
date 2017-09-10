const EARTH_RADIUS = 6371e3

const to_radians = degrees => degrees * Math.PI / 180

const square = x => x * x

// I followed the implementation suggested in http://www.movable-type.co.uk/scripts/latlong.html
const haversine = (a, b) => {
	const a_latitude_rad = to_radians(a.latitude)
	const b_latitude_rad = to_radians(b.latitude)
	const delta_latitude = to_radians(b.latitude - a.latitude)
	const delta_longitude = to_radians(b.longitude - a.longitude)

	const x = square(Math.sin(delta_latitude/2))
		+ Math.cos(a_latitude_rad) * Math.cos(b_latitude_rad) * square(Math.sin(delta_longitude/2))
	const central_angle = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x))
	return EARTH_RADIUS * central_angle
}

module.exports = haversine

/*
const law_of_cosines = (a, b) => {
	const delta_lat = to_radians(b.latitude - a.latitude)
	const delta_lon = to_radians(b.longitude - a.longitude)
	const central_angle = Math.acos(Math.cos(delta_lat) * Math.cos(delta_lon))
	const arc_distance = EARTH_RADIUS * central_angle
	return arc_distance
}

const other = (a, b) => {
	const phi_1 = to_radians(a.latitude)
	const phi_2 = to_radians(b.latitude)
	const delta_phi = to_radians(b.latitude - a.latitude)
	const delta_lon = to_radians(b.longitude - a.longitude)

	const x = square(Math.sin(delta_phi/2)) + Math.cos(phi_1) * Math.cos(phi_2) * square(Math.sin(delta_lon/2))
	const central_angle = 2 * Math.asin(Math.sqrt(x))
	return EARTH_RADIUS * central_angle
}
*/