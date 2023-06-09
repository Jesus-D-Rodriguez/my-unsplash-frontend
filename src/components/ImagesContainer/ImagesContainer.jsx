import "./ImagesContainer.css"
import axios from 'axios';
import { useState, useEffect, useRef, useCallback, Component } from "react";
import { Grid, GridList, GridListTile } from '@material-ui/core';
import Masonry from 'masonry-layout';
import debounce from 'lodash/debounce';


const ImagesContainer = (props)=>{
    const [refresh, setRefresh] = useState(true);
    const [searchTerm, setSearchTerm] = useState(props.searchTerm);
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(15);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [reloadComponent, setReloadComponent] = useState(false);
    const previousSearchTerm = useRef('');
    const [isExecuting, setIsExecuting] = useState(false);
    const [contador, setContador] = useState(0);

useEffect(() => {
   /* let mounted = true;
    if (isExecuting) {
        return;
      }
      setIsExecuting(true);*/
 console.log("props: " + props.searchTerm);
 console.log("previous: "  + previousSearchTerm.current);

  //previousSearchTerm.current = props.searchTerm;
 /* return () => {
    mounted = false;
    setIsExecuting(false);
  };*/
}, [props.searchTerm]);


useEffect(()=> {
    /*setHasMore(true);
    setRefresh(false);
    let mounted = true;*/
    let mounted = true;

    previousSearchTerm.current = props.searchTerm;
  
    //const delayedFetch = debounce(() => {
            setHasMore(true);
    setRefresh(false);
        console.log("Aui deberia hacer fetchimages")
      setImages([]);
      fetchImages();
      //setReloadComponent(false);
      setRefresh(true);
   // }, 0);
    setContador(contador+1);
    console.log("contador antes");
    console.log(contador);
   //delayedFetch();
    console.log("contador despues");
    console.log(contador);

  
    return () => {
      mounted = false;
    };
}, [props.searchTerm]);
//, reloadComponent


    //props.searchTerm, currentPage, , reloadComponent
    //console.log("props " + props.searchTerm);
    //console.log("searchTerm " +searchTerm);

    const deleteImage = async (id)=> {
        console.log("entro a la funcion");
        const url = "https://my-unsplash-api-cr1h.onrender.com" ;
        const url2 = "http://localhost:5000";
        try {
            await axios.post(`${url}/images/${id}`);
            setImages(images.filter(image => image._id !== id));
        } catch (error) {
            console.log(error);
        }
        
    }


    const fetchImages = async (page = 1, perPage = 15) =>{
        setLoading(true);
        try {
            const url = "https://my-unsplash-api-cr1h.onrender.com" ;
            const url2 = "https://localhost:5000";
            const response = await axios.get(`https://my-unsplash-api-cr1h.onrender.com/?page=${page}&perPage=${perPage}&search=${props.searchTerm}`);
            const newImages = response.data;
            
            //if (props.searchTerm != "") {
            /*if (props.searchTerm !== previousSearchTerm.current) {
                console.log("reload");
                setReloadComponent(true);

                setImages(newImages)
            } else {*/
            //setImages(newImages);
            console.log("images antes del set");
            console.log(images);
            console.log("newImages antes del set");
            console.log(newImages);
            console.log("page" + page);
                if (newImages.length < perPage) {
                    console.log("has more = false xd");
                    setHasMore(false);
                }
                setImages(prevImages => [...prevImages, ...newImages]);
                setCurrentPage(page);
            //}
            console.log("images");
            console.log(images);
            console.log("newImages");
            console.log(newImages);
            console.log("page" + page);
            /*if (newImages.length < perPage) {
                setHasMore(false);
            }
            setImages(prevImages => [...prevImages, ...newImages]);
            setCurrentPage(page);*/
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const filterImages = (images, searchTerm) => {
        return images.filter(image => image.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const observer = useRef();
    const lastImageRef = useCallback(node => {
        console.log("aaaaa");
        if (loading) return;
        console.log("bbbbb");
        if (observer.current) observer.current.disconnect();
        console.log("ccccc");
        observer.current = new IntersectionObserver(entries => {
            console.log("ddddddd");
            console.log("entries" + entries[0].isIntersecting);
            console.log("hasMOre" + hasMore);
            if (entries[0].isIntersecting && hasMore) {
  
                console.log("eeeeeeee");
                fetchImages(currentPage + 1, perPage);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore, currentPage, perPage]);

    const renderImages = () => {
        //const filteredImages = filterImages(images, searchTerm);
        return images.map((image, index) => {
            if (index === images.length - 1) {

                return (
                    //ref={lastImageRef}
                    <div key={image._id} className="image-container">
                        <img src={image.imageUrl} alt={image.title} style={{width:'100%'}} />
                        <div className="hover"> 
                            <div className="hover-inside">
                                <div className="hover-inside-1"><button onClick={()=>deleteImage(image._id)}>delete</button> </div>
                                <div className="hover-inside-2"><p style={{color: "white"}}>{image.title}</p></div>
                                
                            </div> 
                        </div>
                    </div>
                );
            } else {

                return (
                    <div key={image._id} className="image-container">
                        <img src={image.imageUrl} alt={image.title} style={{width:'100%'}} />
                        <div className="hover"> 
                            <div className="hover-inside">
                                <div className="hover-inside-1"><button onClick={()=>deleteImage(image._id)}>delete</button> </div>
                                <div className="hover-inside-2"><p style={{color: "white"}}>{image.title}</p></div>
                                
                            </div> 
                        </div>
                    </div>
                );
            }
        });
    }

    return (
        <div id="imgs-container">
            <div id="imgs-container-2">
                {refresh && 
                images.map((image, index) => {
                    if (index === images.length - 1) {
                        //console.log("sexo");
                        return (
                            //
                            <div key={image._id} ref={lastImageRef} className="image-container">
                                <img src={image.imageUrl} alt={image.title} style={{width:'100%'}} />
                                <div className="hover"> 
                                    <div className="hover-inside">
                                        <div className="hover-inside-1"><button onClick={()=>deleteImage(image._id)}>delete</button> </div>
                                        <div className="hover-inside-2"><p style={{color: "white"}}>{image.title}</p></div>
                                        
                                    </div> 
                                </div>
                            </div>
                        );
                    } else {
                       // console.log("sex");
                        return (
                            <div key={image._id} className="image-container">
                                <img src={image.imageUrl} alt={image.title} style={{width:'100%'}} />
                                <div className="hover"> 
                                    <div className="hover-inside">
                                        <div className="hover-inside-1"><button onClick={()=>deleteImage(image._id)}>delete</button> </div>
                                        <div className="hover-inside-2"><p style={{color: "white"}}>{image.title}</p></div>
                                        
                                    </div> 
                                </div>
                            </div>
                        );
                    }
                }
                    
                )}
            </div>
            {loading && <div class="lds-ring"><div></div><div></div><div></div><div></div></div>}

            {!loading && !hasMore && <p>No more images</p>}
        </div>
    )
}

export default ImagesContainer;