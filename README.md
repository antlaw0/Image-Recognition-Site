# Image-Recognition-Site
Node website for use with image recognition API

This app uses the Clarifai image recognition API to take an image uploaded by the user and returns a series of tags that match the image uploaded. It uses base64-img to convert the image to bytes before submitting the data to the API via a temporary file (node tmp). 