FROM node:latest
                                                                                
WORKDIR /usr/src/app                                                            
                                                                                
COPY package*.json ./                                                           
                                                                                
RUN npm install                                                                 
#--only=development                                                             
# RUN npm ci --only=production                                                  
                                                                                
COPY . .                                                                        
                                                                                
ARG NODE_ENV=production                                                         
ENV NODE_ENV=${NODE_ENV}                                                        
                                                                                
EXPOSE 80                                                                       
EXPOSE 3306

CMD [ "node", "./dist/app.js" ]
                                                                                
ARG ENV                                                                         

