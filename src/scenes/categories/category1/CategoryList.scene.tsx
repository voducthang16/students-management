import React from 'react';
import CategoryFormScene from './CategoryForm.scene';

function CategoryList() {
    return (
        <div>
            {/* form CRUD */}
            {/* ref={categoryFormRef} */}
            <CategoryFormScene />
        </div>
    );
}

export default CategoryList;
