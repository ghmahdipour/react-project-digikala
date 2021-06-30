import React from 'react'

const Filter = (props) => {

    return(
        <div className='filter'>
            <div className='filter-result'>{props.count} محصول</div>
            <div className='filter-sort'>
                مرتب سازی {" "} 
                <select value={props.sort} onChange={props.sortProducts}>
                    <option>پربازدیدترین</option>
                    <option value='Most Popular'>محبوب ترین</option>
                </select>
            </div>
        </div>
    )
}

export default Filter