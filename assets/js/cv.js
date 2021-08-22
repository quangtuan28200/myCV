//skill rate----------------------------------------------
$('.cv__skillrate-bar').each((i, e) => {
    var rateValue = $(e).data('rate');
    $(e).children().css("width", `${rateValue*20}%`)
});

//html css to pdf-----------------------------------------
var a = document.querySelector('.cv__wrap');
$('#download').click(() => {
    var opt = {
        filename: "BuiQuangTuan",
        image: { type: 'jpeg', quality: 1 },
        html2canvas: {
            dpi: 192,
            scale: 4,
            letterRendering: true,
            useCORS: true
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().from(a).set(opt).save();
});  