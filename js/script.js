'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
/* generate title links */
function generateTitleLinks(customSelector = ''){
	
  /*clear links*/
  const listTitle = document.querySelector('ul.list');
  listTitle.innerHTML = '';
	
  /* add links*/
  const optCustomSelector = 'article';
  const articles = document.querySelectorAll(optCustomSelector + customSelector);
  //console.log(articles);
	
  for (let article of articles){
    const articleID = article.getAttribute('id');
    const articleTitle = document.querySelector('#'+articleID+' h3.post-title').innerHTML;
    listTitle.innerHTML += '<li><a href="#'+articleID+'"><span>'+articleTitle+'</span></a></li>';
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const hrefAttribute = clickedElement.getAttribute('href');
  //console.log(hrefAttribute);

  /* find the correct article using the selector (value of 'href' attribute) */
  const articleSelector = document.querySelector(hrefAttribute);
  //console.log(articleSelector); 

  /* add class 'active' to the correct article */
  articleSelector.classList.add('active');
};


//generate tags function
function generateTags()
{
  /* find all articles */
  const articles = document.querySelectorAll('article');

  for(let article of articles){
    /* read tags from articles */
    const tags = article.getAttribute('data-tags');
    const tagArray = tags.split(' ');

    /* generate article id */
    const articleId = article.getAttribute('id');
    
    /* write article tag */
    for(let tag of tagArray){
      let tagDisplay = '<li><a href="#tag-'+tag+'">'+tag+'</a></li>';
      document.querySelector('#' + articleId + ' > .post-tags .list').innerHTML += tagDisplay;
    }
  }
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = this.getAttribute('href');
  
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.slice(5);
  
  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  
  /* remove class active */
  for(let activeLink of activeLinks){ 
    activeLink.classList.remove('active');  
  }

  /* find all tag links with "href" attribute equal to the "href" constant */
  const theSameTags = document.querySelectorAll('a[href="#tag-'+tag+'"]');

  /* add class active */
  for(let theSamaTag of theSameTags){
    theSamaTag.classList.add('active');
  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const links = document.querySelectorAll('a[href^="#tag-"');
  
  /* add tagClickHandler as event listener for that link */
  for(let link of links){
    link.addEventListener('click', tagClickHandler);
  }
}

/* generate article author */
function generateAuthor(){
  const articles = document.querySelectorAll('article');

  for(let article of articles){
    const articleID = article.getAttribute('id');
    const author = article.getAttribute('data-author');
    const authorHref = author.replace(' ', '&');
    const display = 'by <a href="#author-'+authorHref+'">'+author+'</a>';  

    document.querySelector('#'+articleID+' > .post-author').innerHTML = display;
  }
}

/* add click listener to author */
function addClickListenersToAuthor(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"');
  
  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event){
  event.preventDefault();

  const clicked = this;
  let author = clicked.getAttribute('href');
  author = author.replace('#author-','');
  author = author.replace('&',' ');
    
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');

  console.log(author);
}


//start function on page load
generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthor();
addClickListenersToAuthor();


