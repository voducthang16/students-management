import Category1Scene from 'scenes/categories/Category1.scene';
import Category2Scene from 'scenes/categories/Category2.scene';

function CategoryPage() {
    return (
        <div>
            <div className="grid grid-cols-2">
                <Category1Scene />
                <Category2Scene />
            </div>
        </div>
    );
}

export default CategoryPage;
