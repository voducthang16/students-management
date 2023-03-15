// import Image from '~components/Image';
import { Image, Tag } from 'antd';
import { IStudent } from 'src/models/students.model';
import dayjs from 'dayjs';

function Item({ name, age, avatar, chemical, email, math, physic, hobbies, sex, createdAt, updatedAt }: IStudent) {
    const customTag = (name: string) => {
        switch (name) {
            case 'Music':
                return '#2db7f5';
            case 'Badminton':
                return '#87d068';
            case 'Football':
                return '#108ee9';
            case 'math':
                return 'gold';
            case 'physic':
                return 'green';
            case 'chemical':
                return 'purple';
            default:
                return '#f50';
        }
    };
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
                    className={'rounded-full w-full !h-full'}
                    rootClassName={'rounded-full h-14 w-14 p-0.5 border border-solid border-slate-200'}
                    fallback="https://imageio.forbes.com/specials-images/imageserve/63a590cfe96a4fea66cc7319/Venusian-Lake/0x0.jpg?format=jpg&crop=1625,914,x0,y484,safe&width=960"
                />
            </td>
            <td className="px-4 py-3 border border-solid border-gray-300" title={email.toLocaleLowerCase()}>
                {email.toLocaleLowerCase()}
            </td>
            <td className="px-4 py-3 border border-solid border-gray-300">{age}</td>
            <td className="px-4 py-3 border border-solid border-gray-300 space-y-2">
                {hobbies.map((item) => (
                    <Tag key={item} color={customTag(item)}>
                        {item}
                    </Tag>
                ))}
            </td>
            <td className="px-4 py-3 border border-solid border-gray-300">{sex}</td>
            <td className="px-4 py-3 border border-solid border-gray-300 font-source-sans-pro space-y-1">
                <h6 className="text-sm font-normal">
                    <Tag color={customTag('math')}>Math: {math}</Tag>
                </h6>
                <h6 className="text-sm font-normal">
                    <Tag color={customTag('physic')}>Physic: {physic}</Tag>
                </h6>
                <h6 className="text-sm font-normal">
                    <Tag color={customTag('chemical')}>Chemical: {chemical}</Tag>
                </h6>
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
