const addNew = ({ title, desc, createdAt, banner, seolink }) => {
    $('#listnews').append(
        `<div id="${seolink}" class="col-sm-6 col-lg-4">
        <div class="card ts-fadeInUp animated" data-animate="ts-fadeInUp" style="visibility: visible;">
            <div class="ts-card__image ts-img-into-bg" style="background-image: url(${banner});">
                <img class="card-img-top" src="${banner}" alt="Card image cap">
            </div>
            <!--end ts-card__image-->
            <div class="card-body">
                <h5 class="mb-1 news-title">${title}</h5>
                <p class="news-description">${desc}</p>
            </div>
            <!--end card-body-->
            <div class="card-footer bg-white">
                <p class="date">${createdAt}</p>
                <!--end social-icons-->
            </div>
            <!--end card-footer-->  
        </div>
        <!--end card-->
    </div>`
    )

    $(`#${seolink}`).on('click', function () {
        window.location.href = `news-detail.html?link=${seolink}`
    })
}

$(document).ready(function ($) {
    $.ajax({
        url: 'http://142.54.171.234:1337/bdmt-news',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (news) {
            news.filter((e) => e)
                .map((e) => {
                    const date = new Date(e.createdAt)
                    let createdAt = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
                    return {
                        title: e.title || '',
                        desc: e.subtitle ? `${e.subtitle}...` : '', 
                        createdAt: createdAt,
                        banner: e.banner && e.banner.url ? `http://142.54.171.234:1337${e.banner.url}` : 'assets/img/news-1.jpg',
                        seolink: e.seolink
                    }
                })
                .forEach((e) => addNew(e))
        },
    });
})

