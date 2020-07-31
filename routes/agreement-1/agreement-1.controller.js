const path = require('path')
const { getNextRoute, routeUtils } = require('./../../utils')
const nodePandoc = require('node-pandoc')
const i18n = require('i18n')

var callback = (err, result) => {
	if (err) {
		console.error(err)
	} else {
		console.log('done conversion')
	}
}

function getRandomString() {
	return Math.random().toString().split('.')[1].slice(0, 8)
}

const startHtml = `<div style="display: none">Start of Agreement</div>`

// make first letter lowercase and delete trailing periods
const lowerCaseFirstLetter = (s) =>
	s && s.length > 0 ? s[0].toLowerCase() + s.slice(1) : s

const stripTrailingPeriods = (s) =>
	s && s.length > 0 && typeof s == 'string' ? s.replace(/\.*\s*$/, '') : s

const changeToPhrase = (key) =>
	!key.includes('partner_department') && !key.includes('researcher')

const checkIfUndefined = (s) => (s == undefined ? '' : s)

module.exports = (app) => {
	const name = 'agreement-1'
	const route = routeUtils.getRouteByName(name)

	routeUtils.addViewPath(app, path.join(__dirname, './'))

	app.get(route.path, (req, res) => {
		var nextRoute = getNextRoute(name).path
		var randomString = getRandomString()
		var docxFilename = 'agreement-' + randomString + '.docx'

		var data = routeUtils.getViewData(req, {}).data

		// data.administrative_decision = checkIfUndefined(data.administrative_decision)
		// data.is_with_partner_team = checkIfUndefined(data.is_with_partner_team)
		// data.compensation = checkIfUndefined(data.compensation)
		// data.confidentiality = checkIfUndefined(data.confidentiality)
		// data.recording_type = checkIfUndefined(data.recording_type)
		// data.company_representation = checkIfUndefined(data.company_representation)
		// data.consent = checkIfUndefined(data.consent)
		// data.research_method = checkIfUndefined(data.research_method)
		// data.personal_information_shared = checkIfUndefined(
		// 	data.personal_information_shared,
		// )
		// data.personal_information_collected = checkIfUndefined(
		// 	data.personal_information_collected,
		// )
		data.research_type = checkIfUndefined(data.research_type)

		console.log(data)

		var queryParams = {}
		Object.keys(data)
			// .filter(key => key !== '_csrf' && data[`${key}`] !== '')
			.filter((key) => key !== '_csrf')
			.forEach((key) => {
				checkIfUndefined(data[`${key}`])
				// queryParams[`${key}`] = [data`${key}`]
				queryParams['test'] = 'test'
			})

		// Object.keys(data)
		// 	.filter(key => key !== '_csrf' && data[`${key}`] !== '')
		// 	.forEach(key => {
		// 		if (changeToPhrase(key)) {
		// 			data[`${key}`] = lowerCaseFirstLetter(stripTrailingPeriods(data[`${key}`]))
		// 		} else if (key.includes('partner_department')) {
		// 			data[`${key}`] = stripTrailingPeriods(data[`${key}`])
		// 		}
		// 		queryParams[`${key}`] = data[`${key}`]
		// 	})

		res.render(
			name + `-${i18n.getLocale(req)}`,
			{
				data,
				nextRoute: nextRoute,
				docxFilename: docxFilename,
			},
			function (err, html) {
				if (err) {
					console.log(err)
				}
				// const startIndex = html.indexOf(startHtml) + startHtml.length
				// const endIndex = html.indexOf('</main>')
				// const htmlDoc = html.slice(startIndex, endIndex)
				// nodePandoc(
				//   htmlDoc,
				//   '-f html -t docx -o public/documents/' + docxFilename,
				//   callback,
				// )
				res.send(html)
			},
		)
	})
}
