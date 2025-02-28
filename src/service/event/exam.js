import { $next } from "@jx3box/jx3box-common/js/https";

//
function getExamPaperList(params) {
	return $next().get("/api/question/user-exam-paper", {
		params,
	});
}

function getExamQuestionList(params) {
	return $next().get("/api/question/public-list", {
		params,
	});
}

function getPaper(id) {
	return $next({ proxy: true }).get(
		"/api/question/user-exam-paper/" + id + "?details"
	);
}

function getQuestion(id) {
	return $next({ proxy: true }).get("/api/question/" + id + "/no-answer");
}

function submitAnswer(id, answers, force = false) {
	return $next({ proxy: true }).post(
		`/api/question/user-exam-paper/${id}/i-finish-all${
			force ? "?force" : ""
		}`,
		answers
	);
}

function submitQuestionAnswer(id, answers) {
	return $next({ proxy: true }).post(
		`/api/question/user-exam-paper/q/${id}/answer`,
		answers
	);
}

function getAnswer(id) {
	return $next({ proxy: true }).post(
		`/api/question/user-exam-paper/${id}/i-need-answer`
	);
}

function getStat(type, id) {
	return $next({ proxy: true }).get(
		"/api/summary-any/" + type + "-" + id + "/stat"
	);
}

function checkPaper(id, action) {
	return $next({ proxy: true }).put(
		"/api/question/exam-paper/" + id + "/opt",
		"",
		{
			params: {
				action: action,
			},
			withCredentials: true,
		}
	);
}

export {
	getExamPaperList,
	getExamQuestionList,
	getPaper,
	getQuestion,
	submitAnswer,
	submitQuestionAnswer,
	getAnswer,
	getStat,
	checkPaper,
};
