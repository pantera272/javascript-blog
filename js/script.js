'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
/* generate title links */
const generateTitleLinks = function(){
	
  /*clear links*/
  console.log('dziala');
  const listTitle = document.querySelector('ul.list');
  listTitle.innerHTML = '';
	
  /* add links*/
  const articles = document.querySelectorAll('article');
  //console.log(articles);
	
  for (let article of articles){
    const articleID = article.getAttribute('id');
    const articleTitle = document.querySelector('#'+articleID+' h3.post-title').innerHTML;
    listTitle.innerHTML += '<li><a href="#'+articleID+'"><span>'+articleTitle+'</span></a></li>';
  }
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
  //console.log(event);

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


generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
