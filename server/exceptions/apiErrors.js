module.exports= class ApiError extends Error{
   
    constructor(status, message , errors=[]){
        super(message);
        this.status = status;
        this.errors= errors;
    }
    static UnathorizedError(){
        return new ApiError(401, "Пользователь не авторизован");
    }
    static BadRequest(message){
        return new ApiError( 400, message, this.errors);
    }
}; 
 
 
 

 

 
 
 

 
 
 
 
 
  
 
 
 
 
 
 
 