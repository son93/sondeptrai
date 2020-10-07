const addNew = ({title, content, author}) => {
    $('#newscontent').append(
        `
        <header class="entry-header ">
            <div class="ast-single-post-order">
                <h1 class="entry-title">${title}</h1>
                <div class="entry-meta">
                    <span class="comments-link">
                        <a href="#respond">Leave a
                            Comment</a>&nbsp;
                    </span>/&nbsp;<span class="cat-links">
                        <a href="news.html" rel="category tag">Tin Tức</a>
                    </span>&nbsp;/ By&nbsp;<span class="posted-by vcard author"><a class="url fn n"
                            title="View all posts by Nguyễn Phạm Huỳnh Như" href="https://bundaumamtom.com/author/nhu/"
                            rel="author"><span class="author-name">${author}</span></a></span></div>
                </div>
            </header>
            <div class="entry-content clear">
                ${content}
            </div>
        `
    )
}

var getParam = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

$(document).ready(function ($) {
    $.ajax({
        url: `http://142.54.171.234:1337/bdmt-news?seolink=${getParam('link')}`,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (news) {
            news.filter((e) => e)
                .map((e) => {
                    return {
                        title: e.title || '',
                        content: e.content || '',
                        author: e.bdmt_author && e.bdmt_author.name ? e.bdmt_author.name : 'Admin'
                    }
                })
                .forEach((e) => addNew(e))
        },
    });
    // addNew({title: 'Tai sao tai sao', richContent: '<p>aaaa</p>', author: 'DUONG THANH OANH'})
})

