const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const jobnet = "https://www.jobnet.com.mm/jobs?kw=web+developer";
const jobinyangon = "https://www.jobsinyangon.com/app/job-search?jobtype=542017072331869&region=17&send=1&reset_filtr=1&lang=en";

axios(jobnet)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles1 = [];

    $(".search__job-heading > a", html).each(function () {
      const title = $(this).text();
      const url = "https://www.jobnet.com.mm" + $(this).attr("href");
      articles1.push({ title, url });
    });
    console.log(articles1);
  })
  .catch((err) => {
    console.log(err);
  });

axios(jobinyangon)
    .then((response) => {
        const html1 = response.data;
        const $ = cheerio.load(html1);
        const articles2 = [];

        $(".col-lg-4", html1).each(function () {
            const title = $(this).text();
            // const date = $(".col-lg-12 > strong:first").text();
            const url = 'https://www.jobsinyangon.com/app/' + $(this).find('a').attr("href");
            articles2.push({title, url});
        });
        console.log(articles2);
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
