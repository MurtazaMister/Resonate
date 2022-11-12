import React from 'react';
import SongCard from '../component/SongCard';
import './SongListing.css'

const SongListing = ({song, type}) => {
    return (
        <>
        <div className="song-list-container">
            <div className="song-list-title">{song.title}</div>
            <div className="song-list-collection">
                {
                    song?.list?.map((item)=>{
                        return <SongCard key={item._id} className='song-card' type={type} song={item}></SongCard>
                    })
                }
            </div>

            {/* <Accordion>
                <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <h5>Accordion 2</h5>
                </AccordionSummary>
                <AccordionDetails>
                <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </h5>
                </AccordionDetails>
            </Accordion> */}
        </div>
        </>
    );
}
 
export default SongListing;