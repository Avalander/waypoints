const EARTH_RADIUS = 6371e3

const to_radians = degrees => degrees * Math.PI / 180

const square = x => x * x

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

module.exports = {
	haversine,
	law_of_cosines,
	other,
}

/*
http://www.movable-type.co.uk/scripts/latlong.html

a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
c = 2 ⋅ atan2( √a, √(1−a) )
d = R ⋅ c

var R = 6371e3; // metres
var φ1 = lat1.toRadians();
var φ2 = lat2.toRadians();
var Δφ = (lat2-lat1).toRadians();
var Δλ = (lon2-lon1).toRadians();

var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

var d = R * c;
*/