import React from 'react';

export default function test({ msg }) {
    return (
        <div>
            <h1>test</h1>
            <p>{msg}</p>
        </div>
    );
}

export async function getServerSideProps() {
    return { props: { msg: 'Hey' } };
}
