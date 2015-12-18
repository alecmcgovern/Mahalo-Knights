# Mahalo-Knights
Visit the Alpha site here: [Mahalo Knights]

This is the first draft of the new online store for Mahalo Knights.  It was initially built in one week as the final project for General Assembly's 12 week Web Development Immersive.  The current version hosted by heroku.com does not include functioning ecommerce or the ability to purchase items.  Stay tuned for updates.

### Tools used:
* MEAN stack (Mongo, Express, Angular, Node)
* HTML5, CSS, Javascript, jQuery
* [Stripe] for eCommerce capabilities
* [snowstorm.js]
* [Cloudinary]
* [async]
* font awesome icons
* google fonts


This project is something I have been thinking about doing for a while as my final project General Assembly Program.  My general approach was to create a visually pleasing online clothing store, with the hope that it will become fully functional/secure and deployed online at the Mahalo Knights domain name.  I started by creating my clothing and admin models so that administrators of the site have full control over posting, editing, and deleting new clothing stock as necessary.  This was important to give the owners of Mahalo Knights as much autonomy as possible, without having to dive into the source code everytime new items were instock.  I used cloudinary for basic image uploads, and hope to add cropping and image editing through cloudinary in the future.

The shopping cart is almost complete at the moment other than a few bugs to work through.

#####Known issues:  
* Restocking issue when shopping cart is cleared
* No working payment methods available
* General lack of completeness




Built By Alec McGovern

[async]: <https://github.com/caolan/async>
[Cloudinary]: <http://cloudinary.com/>
[snowstorm.js]: <http://www.schillmania.com/projects/snowstorm/>
[Stripe]: <https://stripe.com/>
[Mahalo Knights]: <http://mahaloknights.herokuapp.com/clothing>