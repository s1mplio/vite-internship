interface Post {
    id: number;
    name: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        url: string;
      }; 
  }

  
  
  
  export default Post;