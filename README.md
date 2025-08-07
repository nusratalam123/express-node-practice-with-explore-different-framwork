# Project Name

##Description:
-----------------------------------------------------
use a zod validation
use swagger for documentation
swagger run on the port: http://localhost:5001/api-docs/
use grafana for api monitoring
use loki for total api hit

## Installation of loki
------------------------------------------------------
firstly run the backend project
docker network connect loki-net practice-grafana-1
docker restart practice-grafana-1
practice-grafana-1
curl http://localhost:3100/ready
docker rm -f grafana loki  
—------------------------------------------------------                                         
docker run -d \                                                            
  --name=loki \   
  --network=loki-net \
  -p 3100:3100 \
  grafana/loki:2.9.3 \
  -config.file=/etc/loki/local-config.yaml
—------------------------------------------------------
docker run -d \                                                                         
  --name=grafana \
  --network=loki-net \
  -p 3000:3000 \
  grafana/grafana

12e19e05331fcda8aa5f64b7c80b3b456c7f99c1a33570a5cab1e4fad0413901

curl http://localhost:3100/ready     

grafana run on :http://localhost:3001/
data source add this port loki interface:http://localhost:3100

