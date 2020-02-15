const isRequired = () => {
	return {
		custom: {
			options: (value, { req }) => {
				if (
					process.env.NODE_ENV !== 'development' &&
					!(value && value.length > 0)
				) {
					return false
				}
				return true
			},
			errorMessage: 'errors.requiredField',
		},
	}
}

const Schema = {
	//SET IF A SECTION IS REQUIRED
	// research_goal: isRequired(),
	// session_activity: isRequired(),
	// session_duration: isRequired(),
	// personal_information_collected: isRequired(),

	recording_type: {
		custom: {
			options: (value, { req }) => {
				const confidentiality = req.body.confidentiality
				if (
					confidentiality &&
					['form.confidentiality_full'].includes(confidentiality)
				) {
					if (['form.recording_video', 'form.recording_image'].includes(value)) {
						return false
					}
				}
				return true
			},
			errorMessage: 'errors.recording_type',
		},
	},
	consent: {
		custom: {
			options: (value, { req }) => {
				const compensation = req.body.compensation
				if (compensation && compensation === 'Yes') {
					if (value === 'form.consent_verbal') {
						return false
					}
				}
				return true
			},
			errorMessage: 'errors.consent',
		},
	},
	researcher_email: {
		custom: {
			options: (value, { req }) => {
				if (value && value.length > 0) {
					// if (!value.endsWith('.gc.ca')) {
					// 	return false
					// }
				}
				return true
			},
			errorMessage: 'errors.researcher_email',
		},
	},
}

module.exports = {
	Schema,
}
