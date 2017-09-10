const waypoints = require('../data/waypoints.json')
const haversine = require('./haversine')
const {
	make_waypoints_to_segments,
	segments_to_categories,
} = require('./transform-waypoints')

const waypoints_to_segments = make_waypoints_to_segments(haversine)

const transform_waypoints = waypoints => {
	const segments = waypoints_to_segments(waypoints)
	return segments_to_categories(segments)
}

console.log(transform_waypoints(waypoints))
