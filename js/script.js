'use strict';
/*
document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});
*/
/*function generate title links */
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

//function find min and max values of tags 
function calculateTagsParams(tags){
  let min = 0;
  let max = 0;
  for(let tag in tags){
    /*find max value*/
    if(tags[tag] > max){
      max = tags[tag];
    }
    /*find min value*/
    if(min == 0){
      min = tags[tag];
    } else if(tags[tag] < min){
      min = tags[tag];
    }
  }

  const tagParams = {'min': min, 'max' : max};
  return tagParams;
}

//function generate size tag
function calculateTagClass(count, params){
  const optCloudClassCount = 5;

  const min = params.min;
  const max = params.max;
  const range = max - min;
  let percentage = count - min;
  percentage = percentage/range;
  const size = Math.floor(percentage*(optCloudClassCount - 1) +1);
  return size;
}


//function generate tags 
function generateTags(){
  const optTagListerSelector = '.tags.list';
  const optCloudClassPrefix = 'tag-size-';
  
  /* create a new variable allTags with an empty object */
  let allTags = {};
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
      let tagDisplay = '<li><a href="#tag-' + tag + '"> ' + tag + ' </a></li>';
      document.querySelector('#' + articleId + ' > .post-tags .list').innerHTML += tagDisplay;
      
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
  }

  const tagList = document.querySelector(optTagListerSelector);
  
  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    let tagSize = calculateTagClass(allTags[tag], tagsParams);
    allTagsHTML += '<li><a class="'+ optCloudClassPrefix + tagSize +'" href="#tag-' + tag + '">' + tag +'</a> (' + allTags[tag] + ')</li>';
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
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

/* generate author list*/
function generateAuthorList()
{
  /*generate author list*/
  const articles = document.querySelectorAll('article');
  let authorList = [];

  for(let article of articles){
    const author = article.getAttribute('data-author');

    if(authorList == ''){
      authorList.push(author);
    } else {
      let authorIs = authorList.indexOf(author);
      
      if(authorIs == -1){
        authorList.push(author);
      }
    }
  }

  /*generate author html link*/
  const authorPlace = document.querySelector('.section-author');
  
  for(let author of authorList){
    let articleNumber = 0;
    for(let article of articles){
      const authorNumber = article.getAttribute('data-author');
      if(author == authorNumber){
        articleNumber++;
      } 
    }
    const authorHref = author.replace(' ','&');
    authorPlace.innerHTML+= '<li><a href="#author-' + authorHref + '">' + author + '</a> (' + articleNumber + ')</li>';
  }
}


//start function on page load
generateTitleLinks();
generateTags();
addClickListenersToTags();
generateAuthor();
generateAuthorList();
addClickListenersToAuthor();



