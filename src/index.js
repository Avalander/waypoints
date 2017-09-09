const waypoints = require('../data/waypoints.json')
const { haversine, law_of_cosines, other } = require('./distance')


const waypoints_with_date = waypoints
	.map(x => Object.assign({}, x, { date: new Date(x.timestamp) }))

const segments = waypoints_with_date
	.slice(1, waypoints_with_date.length)
	.reduce((acc, x) => ({
		previous: x,
		result: acc.result.concat({
			duration: x.date - acc.previous.date,
			distance: haversine(x.position, acc.previous.position),
			is_speeding: x.speed > x.speed_limit,
		}),
	}), {
		previous: waypoints_with_date[0],
		result: []
	})
	.result



const meta_reducer = (...reducers) => (acc, x) =>
	reducers.reduce((part, fn) => Object.assign({}, part, fn(part, x)), acc)

const total_duration_reducer = ({ total_duration=0 }, x) => ({
	total_duration: total_duration + x.duration
})

const speeding_duration_reducer = ({ speeding_duration=0 }, x) => ({
	speeding_duration: speeding_duration + (x.is_speeding ? x.duration : 0)
})

const total_distance_reducer = ({ total_distance=0 }, x) => ({
	total_distance: total_distance + x.distance
})

const speeding_distance_reducer = ({ speeding_distance=0 }, x) => ({
	speeding_distance: speeding_distance + (x.is_speeding ? x.distance : 0)
})

const calculate_data_2 = meta_reducer(
	total_duration_reducer,
	total_distance_reducer,
	speeding_duration_reducer,
	speeding_distance_reducer,
)

const segmentReducer = ({
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

console.log(segments.reduce(calculate_data_2, {}))
console.log(segments.reduce(segmentReducer, {}))

