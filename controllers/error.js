exports.get404Page = (req, res, next) => {
    res.status(404).render('404', {pageTitle: 'Error 404', path:'no'});
}

exports.get500Page = (req, res, next) => {
    res.status(500).render('500', {pageTitle: 'Error 500', path:'no'});
}