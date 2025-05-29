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
	return $next().get(
		"/api/question/user-exam-paper/" + id + "?details"
	);
}

function getQuestion(id) {
	return $next().get("/api/question/" + id + "/no-answer");
}

function submitAnswer(id, answers, force = false) {
	return $next().post(
		`/api/question/user-exam-paper/${id}/i-finish-all${
			force ? "?force" : ""
		}`,
		answers
	);
}

function submitAnswerTrial(id, answers) {
    return $next().post(
        `/api/next2/question/user-exam-paper/${id}/i-finish-all/trial?force`,
        answers
    );
}

function submitQuestionAnswer(id, answers) {
	return $next().post(
		`/api/question/user-exam-paper/q/${id}/answer`,
		answers
	);
}

function getAnswer(id) {
	return $next().post(
		`/api/question/user-exam-paper/${id}/i-need-answer`
	);
}

function getStat(type, id) {
	return $next().get(
		"/api/summary-any/" + type + "-" + id + "/stat"
	);
}

function checkPaper(id, action) {
	return $next().put(
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
    submitAnswerTrial,
	getAnswer,
	getStat,
	checkPaper,
};
