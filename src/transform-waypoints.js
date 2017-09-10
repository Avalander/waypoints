const make_waypoints_to_segments = calculate_distance => waypoints => {
	const waypoints_with_date = waypoints
		.map(x => Object.assign({}, x, { date: new Date(x.timestamp) }))
	return waypoints_with_date
		.slice(1, waypoints_with_date.length)
		.reduce((acc, x) => ({
			previous: x,
			result: acc.result.concat({
				duration: x.date - acc.previous.date,
				distance: calculate_distance(x.position, acc.previous.position),
				is_speeding: x.speed > x.speed_limit,
			}),
		}), {
			previous: waypoints_with_date[0],
			result: []
		})
		.result
}

const segments_reducer = ({
	total_distance=0,
	total_duration=0,
	speeding_distance=0,
	speeding_duration=0,
}, x) => ({
	total_duration: total_duration + x.duration,
	speeding_duration: speeding_duration + (x.is_speeding ? x.duration : 0),
	total_distance: total_distance + x.distance,
	speeding_distance: speeding_distance + (x.is_speeding ? x.distance : 0),
})

const segments_to_categories = segments => segments.reduce(segments_reducer, {})

module.exports = {
	make_waypoints_to_segments,
	segments_to_categories,
}
