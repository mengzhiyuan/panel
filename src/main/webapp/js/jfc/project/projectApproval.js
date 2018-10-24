/**
 * Created by wangxiangyang on 2017/12/21.
 */
const projectApproval = {

    state: '',

    role: '',

    disabledInit: function(){

        $('#about_project').find('input').each(function(){$(this).prop('disabled', true)})
            .find('select').each(function(){$(this).prop('disabled', true)});

        $('#project_basic').find('input').each(function(){$(this).prop('disabled', true)})
            .find('select').each(function(){$(this).prop('disabled', true)});

        $('#project_cost').find('input').each(function(){$(this).prop('disabled', true)})
            .find('select').each(function(){$(this).prop('disabled', true)});
	        $('#budgetedPerformance').prop('disabled', false);
    },

    //根据审批状态变化
    varyState: function(){

        this.state = sessionStorage.getItem('state');

        switch (this.state){

            case '0'://预算申请填写中

                $('.add_col').css('display','none');

                $('.input.supplementary').prop('disabled',true);
                $('.input.final_account').prop('disabled',true);
                $('.input.surplus').prop('disabled',true);

                break;

            case '1'://追加预算申请填写中

                $('.input.abstract').prop('disabled',true);
                $('.input.budget').prop('disabled',true);
                $('.input.final_account').prop('disabled',true);
                $('.input.surplus').prop('disabled',true);
                $('.remark1').prop('disabled',true);
                $('.remark2').prop('disabled',true);
                break;

            case '2'://决算申请填写中

                $('.add_col').css('display','none');
                $('.add_row').css('display','none');

                $('.input.abstract').prop('disabled',true);
                $('.input.supplementary').prop('disabled',true);
                $('.input.budget').prop('disabled',true);
                $('.input.surplus').prop('disabled',true);
                break;

            case '3'://审批中

                $('.add_col').css('display','none');
                $('.add_row').css('display','none');

                $('.input.abstract').prop('disabled',true);
                $('.input.budget').prop('disabled',true);
                $('.input.supplementary').prop('disabled',true);
                $('.input.final_account').prop('disabled',true);
                $('.input.surplus').prop('disabled',true);
                $('.remark1').prop('disabled',true);
                $('.remark2').prop('disabled',true);
                break;
        }
    },
    //根据角色人不同变化
    varyRole: function(){

        this.role = sessionStorage.getItem('usr');

        switch (this.role){

            case '1'://申请人

                $('.manager_button').prop('disabled',true);
                $('.director_button').prop('disabled',true);
                break;

            case '2'://经理

                $('.applicant_input').prop('disabled',true);
                $('.director_button').prop('disabled',true);
                break;

            case '3'://总监

                $('.applicant_input').prop('disabled',true);
                $('.manager_button').prop('disabled',true);
                break;

            default:

                $('.applicant_input').prop('disabled',true);
                $('.manager_button').prop('disabled',true);
                $('.director_button').prop('disabled',true);
                break;
        }
    },
    approvalInit: function(){
        this.disabledInit();
        this.varyRole();
        this.varyState()
    }
};