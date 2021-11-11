# Social Application like [Reddit](https://www.reddit.com/).
## Social Application based on [Reddit](https://www.reddit.com/) made with Spring Boot, MariaDB and Angular


# Gallery

![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20015435.png)
![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20015746.png)
![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20020520.png)
![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20020608.png)
![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20020909.png)
![Image1](https://github.com/giuraionut/social-app/blob/main/presentation/Screenshot%202021-11-11%20020931.png)

Right now the project has the following features available:
* Create/delete account
* Create/join communities
* Create posts in communities
* Delete comments
* Comment to posts/reply to comments
* Show user all his comments/posts/communities and other account information
* Vote (up vote or down vote) comments and posts.
* Hide posts that you don't want to see again.
* Backend is secured with JWT and role based permission.
* Create a feed from user's joined communities
* Get top X most recent posts
---
  
## API ENDPOINTS
### `User` `api/v1/user`
---
### Post
```
api/v1/user/register
api/v1/user/me/logout
api/v1/user/me/jwt/refresh
api/v1/user/me/uit/refresh
```
### Put
```
api/v1/user/password
api/v1/user/email
```
### Delete
```
api/v1/user/ac

```
### `Community` `api/v1/community`
---
### Post
```
api/v1/community/create_community
```
### Delete
```
api/v1/community/{title}
```
### Get
```
api/v1/community/{username}/communities
api/v1/community/{title}/about
api/v1/community/{title}/{username}
api/v1/community/{username}/joined
api/v1/community/top
```  
### Put
```
api/v1/community/{title}/{username}
```
### `Post` `api/v1/post`
---
### Post
```
api/v1/post/{communityTitle}/add_post
```
### Delete
```
api/v1/post/{postId}
```
### Put
```
api/v1/post/{postId}/vote
api/v1/post/{postId}/{username}/visibility
```  
### Get
```
api/v1/post/{communityTitle}/all
api/v1/post/{username}/owned/all
api/v1/post/{username}/feed
api/v1/post/{postId}
api/v1/post/{postId}/votes
api/v1/post/{username}/voted
api/v1/post/{postId}/comments/count
api/v1/post/{username}/hidden
api/v1/post/most_recent
```
### `Comment` `api/v1/comment`
---
### Post
```
api/v1/comment/post/{postId}
api/v1/comment/parent_comment/{commentId}
api/v1/comment/{commentId}/vote/{value}
```
### Delete
```
api/v1/comment/{commentId}
```
### Get
```
api/v1/comment/post/{postId}
api/v1/comment/{commentId}/childs
api/v1/comment/{username}
api/v1/comment/{commentId}/childs/count
api/v1/comment/{commentId}/votes/value
api/v1/comment/voted/all
```
