import { Pagination } from "react-bootstrap";
const Paginate = ({ pages, setPageNumber, pageNumber })=>{
    return pages > 1 && (
        <Pagination size="lg" className="my-4">
            {
                [...new Array(pages).keys()].map((item)=>{
                    return (
                        <Pagination.Item key={item} onClick={()=> setPageNumber(item + 1)} active={(item + 1) === pageNumber}>
                            {item + 1}
                        </Pagination.Item>
                    )
                })
            }
        </Pagination>
    )
}
export default Paginate;