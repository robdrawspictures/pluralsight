$(document).ready(function () {
    $(".add-member .btn").click(function () {
        var gender = $("input[type=radio][name=Gender]:checked").val();
        var age = $("input[type=radio][name=Age]:checked").val();

        if (!gender || !age) {
            alert("Please select the gender and age");
        }
        else {
            $(".members").append("<div tabindex='0'>" + gender + ", " + age + "</div>");
        }

    });   
});

$(this).on('keydown', function (event) {
    if (event.key == 'r') { 
        $(".members>div:focus").remove();
    } else if (event.key == 'x' && event.ctrlKey) { 
        $(".members>div").remove();
    }
});