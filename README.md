# sentences-classify

Service in  Node JS to classify sentences, only EN.
## Usage
Build image, run container, show logs
```
docker-compose build && docker-compose up -d && docker-compose logs -f
```
## Endpoints
Classify sentence 
```
Method: POST
Field: sentence
URL: http://[HOST]:[PORT]/sentence

```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
a
## License
[MIT](https://choosealicense.com/licenses/mit/)