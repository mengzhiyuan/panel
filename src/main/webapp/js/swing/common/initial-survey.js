function Initialize(){
    if (sessionStorage.getItem('information')){
        this.usr_email = JSON.parse(sessionStorage.getItem('information')).iEmail;
    }

    this.survey_id = sessionStorage.getItem('survey_id') || '';
    this.sub_id = sessionStorage.getItem('sub_id') || '';
    this.survey_number = sessionStorage.getItem('survey_number') || 'WJ001023';
    this.survey_name = sessionStorage.getItem('survey_name') || '某个问卷题目';
    this.publish_status = sessionStorage.getItem('publish_status') || false;

    sessionStorage.removeItem('survey_id');
    sessionStorage.removeItem('survey_number');
    sessionStorage.removeItem('survey_name');
    sessionStorage.removeItem('publish_status');
}
const initial = new Initialize();
export default initial;