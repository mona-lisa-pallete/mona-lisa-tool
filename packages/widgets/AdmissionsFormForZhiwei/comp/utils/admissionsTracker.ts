import { trackLog } from "@gr-davinci/core";

export function admissionsTrackClick(name: string, other: any = {}) {
  trackLog({
    e_c: "page",
    e_a: "click",
    e_n: name,
    other,
  });
}

export function track_phonenumber_focus() {
  admissionsTrackClick("phonenumber_focus");
}
export function track_phonenumber_success() {
  admissionsTrackClick("phonenumber_success");
}

export function track_verification_code_send() {
  admissionsTrackClick("verification_code_send");
}

export function track_verification_code_resend() {
  admissionsTrackClick("verification_code_resend");
}

export function track_phonenumber_fail(phoneNumber: string) {
  admissionsTrackClick("phonenumber_fail", { phoneNumber });
}

export function track_verification_code_fail(
  phoneNumber: string,
  verificationCode: string
) {
  admissionsTrackClick("verification_code_fail", {
    phoneNumber,
    verificationCode,
  });
}

export function track_login_success() {
  admissionsTrackClick("login_success");
}

export function track_popup_originalclass() {
  admissionsTrackClick("popup_originalclass");
}
export function track_popup_originalclass_click() {
  admissionsTrackClick("popup_originalclass_click");
}
export function track_username_input_focus() {
  admissionsTrackClick("username_input_focus");
}
export function track_username_input_fail() {
  admissionsTrackClick("username_input_fail");
}

export function track_pickcourses() {
  admissionsTrackClick("pickcourses");
}

export function track_toast_pickcourses_error() {
  admissionsTrackClick("toast_pickcourses_error");
}

export function track_grade_select() {
  admissionsTrackClick("grade_select");
}
export function track_clazz_select() {
  admissionsTrackClick("clazz_select");
}

export function track_clazz_select_fail() {
  admissionsTrackClick("clazz_select_fail");
}

export function track_click_address_province() {
  admissionsTrackClick("click_address_province");
}
export function track_toast_province_error() {
  admissionsTrackClick("toast_province_error");
}
export function track_click_address_city() {
  admissionsTrackClick("click_address_city");
}
export function track_address_input_focus() {
  admissionsTrackClick("address_input_focus");
}
export function track_toast_city_error() {
  admissionsTrackClick("toast_city_error");
}

export function track_address_input_fail() {
  admissionsTrackClick("address_input_fail");
}
export function track_course_submit() {
  admissionsTrackClick("course_submit");
}
export function track_course_submit_success() {
  admissionsTrackClick("course_submit_success");
}
export function track_course_submit_fail() {
  admissionsTrackClick("course_submit_fail");
}

export function track_click_courses_time() {
  admissionsTrackClick("click_courses_time");
}
