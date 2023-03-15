import Image from '~components/Image';
import { IStudent } from 'src/models/students.model';
import dayjs from 'dayjs';

function Item({ name, age, avatar, chemical, email, math, physic, sex, createdAt, updatedAt }: IStudent) {
    return (
        <tr>
            <th
                scope="row"
                className="px-4 py-3 border border-solid border-gray-300 font-medium font-raleway text-gray-900 whitespace-nowrap"
            >
                {name}
            </th>
            <td className="py-4 border border-solid border-gray-300 text-center">
                <Image
                    src={avatar}
                    alt={name}
                    className={'rounded-full h-14 w-14 p-0.5 border border-solid border-slate-200'}
                />
            </td>
            <td className="px-4 py-3 border border-solid border-gray-300">{email.toLocaleLowerCase()}</td>
            <td className="px-4 py-3 border border-solid border-gray-300">{age}</td>
            <td className="px-4 py-3 border border-solid border-gray-300">{sex}</td>
            <td className="px-4 py-3 border border-solid border-gray-300 font-source-sans-pro">
                <h6 className="text-sm font-normal">Math: {math}</h6>
                <h6 className="text-sm font-normal">Physic: {physic}</h6>
                <h6 className="text-sm font-normal">Chemical: {chemical}</h6>
            </td>
            <td className="px-4 py-3 border border-solid border-gray-300">{dayjs(createdAt).format('DD-MM-YYYY')}</td>
            <td className="px-4 py-3 border border-solid border-gray-300">{dayjs(updatedAt).format('DD-MM-YYYY')}</td>
            <td className="px-4 py-3 border border-solid border-gray-300">
                <button
                    id="apple-imac-27-dropdown-button"
                    data-dropdown-toggle="apple-imac-27-dropdown"
                    className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                    type="button"
                >
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}

export default Item;
